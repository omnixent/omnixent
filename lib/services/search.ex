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
          store_to_mnesia: 5
         ]

  import Omnixent.Utils,
         only: [
          last_week_day: 0
         ]

  import Omnixent.Languages,
         only: [
          read_languages_file: 1
         ]

  def search(term, service \\ :google, country \\ :us, language \\ :en) do
    with true <- Enum.member?(available_languages, language),
         true <- Enum.member?(available_countries, country),
         true <- Enum.member?(available_services,  service) do
      
          case check_if_exist(term, country, language, service, last_week_day) do
            {:true, result} ->
              result
            _ ->
              read_languages_file(language)
                |> Enum.map(& String.replace(&1, "@", term))
                |> Enum.map(& call_service(&1, country, language, service))
                |> Enum.map(& store_to_mnesia(&1, term, country, language, service))

              search(term, service, country, language)
          end

    else
      false -> {:error, "Unsupported language"}
      false -> {:error, "Unsupported country"}
      false -> {:error, "Unsupported service"}
    end
  end

  defp call_service(term, country, language, service) do
    case service do
      :google  -> 
        Omnixent.Services.Google.call_google(term, country, language)
      :youtube -> 
        Omnixent.Services.Youtube.call_youtube(term, country, language)
    end
  end

end