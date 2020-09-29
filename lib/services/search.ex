defmodule Omnixent.Services do

  import Omnixent.Core, 
         only: [
           available_languages: 0, 
           available_countries: 0, 
           available_services:  0
        ]

  import Omnixent.Mnesia,
         only: [
           check_if_exist:  5,
           store_to_mnesia: 6
         ]

  import Omnixent.Utils,
         only: [
           last_week_day: 0
         ]

  import Omnixent.Languages,
         only: [
           read_languages_file: 1
         ]

  @spec search(String.t(), atom, atom, atom) :: struct
  def search(term, service \\ :google, country \\ :us, language \\ :en) do
    with _ <- Enum.member?(available_languages(), language),
         _ <- Enum.member?(available_countries(), country),
         _ <- Enum.member?(available_services(),  service) do
      
          case check_if_exist(term, country, language, service, last_week_day) do
            {:true, result} ->
              format_result(result, term, service, country, language)
            _ ->
              search_uuid = UUID.uuid4
              IO.inspect search_uuid
              read_languages_file(language)
                |> Enum.map(& String.replace(&1, "@", term))
                |> Enum.map(& call_service(&1, country, language, service))
                |> Enum.map(& store_to_mnesia(&1, term, country, language, service, search_uuid))

              search(term, service, country, language)
          end

    else
      false -> {:error, "Unsupported language"}
      false -> {:error, "Unsupported country"}
      false -> {:error, "Unsupported service"}
    end
  end

  defp call_service(term, country, language, service) do
    case get_service_uri(term, country, language, service) |> HTTPoison.get do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, term, extract_body(body, service)}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, 404}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}

      _ ->
        {:error, "Unknown error from HTTPoison"}
      end
  end

  defp get_service_uri(term, country, language, service) do
    case service do
      :google ->
        Omnixent.Services.Google.format_uri(term, country, language)
      :youtube ->
        Omnixent.Services.Youtube.format_uri(term, country, language)
      :amazon ->
        Omnixent.Services.Amazon.format_uri(term, country, language)
    end
  end

  defp extract_body(body, service) do
    case service do
      :google ->
        Omnixent.Services.Google.extract_body(body)
      :youtube ->
        Omnixent.Services.Youtube.extract_body(body)
      :amazon ->
        Omnixent.Services.Amazon.extract_body(body)
    end
  end

  defp format_result(result, term, service, country, language) do

    search_uuid = result |> hd |> (&(&1.uuid)).()

    filtered_results = Enum.map(result, fn res ->
      %{
        id:     res.id,
        date:   res.date,
        term:   res.term,
        result: res.result
      }
    end)
    
    %{
      uuid:     search_uuid,
      term:     term,
      service:  service,
      country:  country,
      language: language,
      result:   filtered_results
    }
  end

end