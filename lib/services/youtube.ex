defmodule Omnixent.Services.Youtube do

  @platform            "youtube"
  @youtube_endpoint    "https://clients1.google.com/complete/search"
  @youtube_queryparams "&client=youtube&gs_ri=youtube"

  def call_youtube(term, country, language) do
    case format_youtube_uri(term, country, language) |> HTTPoison.get do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, term, extract_youtube_body(body)}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, 404}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}

      _ ->
        {:error, "Unknown error from HTTPoison"}
      end
  end

  def format_youtube_uri(term, country, language) do
    @youtube_endpoint
      <> "?q="
      <> URI.encode(term)
      <> @youtube_queryparams
      <> "hl="
      <> String.downcase(Atom.to_string(language))
      <> "&gl="
      <> String.upcase(Atom.to_string(country))
  end

  def extract_youtube_body(result) do
    try do
      result
        |> String.replace(~r/^window\.google\.ac\.h\(/, "")
        |> String.replace(~r/\)$/, "")
        |> Omnixent.Utils.safe_json_decode
        |> Enum.at(1)
        |> Enum.map(& hd(&1))
    rescue
      _ -> []
    end
  end

end