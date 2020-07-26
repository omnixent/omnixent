defmodule Omnixent.Services.Youtube do

  @youtube_endpoint    "https://clients1.google.com/complete/search"
  @youtube_queryparams "?client=youtube&gs_ri=youtube"

  def call_youtube(term, country, language) do
    case format_youtube_uri(term, country, language) |> HTTPoison.get do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, term, body}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, 404}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}

      _ ->
        {:error, "Unknown error from HTTPoison"}
      end
  end

  def format_youtube_uri(term, country \\ "en", language \\ "en") do
    @youtube_endpoint
      <> URI.encode(term)
      <> @youtube_queryparams
      <> "hl="
      <> String.downcase(language)
      <> "&gl="
      <> String.upcase(country)
  end

end