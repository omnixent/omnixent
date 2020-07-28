defmodule Omnixent.Services.Google do
  
  @platform           "google"
  @google_endpoint    "https://www.google.com/complete/search?q="
  @google_queryparams "&client=psy-ab&"

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
      <> String.downcase(Atom.to_string(country))
      <> "-"
      <> String.upcase(Atom.to_string(language))
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