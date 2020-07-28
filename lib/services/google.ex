defmodule Omnixent.Services.Google do
  
  @platform           "google"
  @google_endpoint    "https://www.google.com/complete/search?q="
  @google_queryparams "&client=psy-ab&"

  def search(term, country \\ "en", language \\ "en") do
    case Omnixent.Mnesia.check_if_exist(term, country, language, @platform , Omnixent.Utils.last_week_day) do
      {:true, result} ->
        result
      _ ->
        Omnixent.Languages.read_languages_file(language)
          |> Enum.map(& String.replace(&1, "@", term))
          |> Enum.map(& call_google(&1, country, language))
          |> Enum.map(& Omnixent.Mnesia.store_to_mnesia(&1, term, country, language, @platform))
        
        with {:true, result} = Omnixent.Mnesia.check_if_exist(term, country, language, Omnixent.Utils.current_date) do
          result
        end
    end
  end

  def call_google(term, country, language) do
    case format_google_uri(term, country, language) |> HTTPoison.get do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, term, extract_google_body(body)}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, 404}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}

      _ ->
        {:error, "Unknown error from HTTPoison"}
      end
  end

  def format_google_uri(term, country \\ "en", language \\ "en") do
    @google_endpoint
      <> URI.encode(term)
      <> @google_queryparams
      <> "hl="
      <> String.downcase(country)
      <> "-"
      <> String.upcase(language)
  end

  def extract_google_body(response) do
    "#{:erlang.binary_to_list(response)}"
      |> Omnixent.Utils.safe_json_decode
      |> Enum.at(1)
      |> Enum.map(& 
        &1 
        |> hd
        |> String.replace("<b>", "")
        |> String.replace("</b>", "")
        |> String.replace("&#39;", "'")
      )
  end

end