defmodule Omnixent.Services.Youtube do

  @platform            "youtube"
  @youtube_endpoint    "https://clients1.google.com/complete/search"
  @youtube_queryparams "&client=youtube&gs_ri=youtube"

  def search(term, country \\ "en", language \\ "en") do
    case Omnixent.Mnesia.check_if_exist(term, country, language, @platform , Omnixent.Utils.last_week_day) do
      {:true, result} ->
        result
      _ ->
        Omnixent.Languages.read_languages_file(language)
          |> Enum.map(& String.replace(&1, "@", term))
          |> Enum.map(& call_youtube(&1, country, language))
          |> Enum.map(& Omnixent.Mnesia.store_to_mnesia(&1, term, country, language, @platform))
        
        with {:true, result} = Omnixent.Mnesia.check_if_exist(term, country, language, Omnixent.Utils.current_date) do
          result
        end
    end
  end

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

  def format_youtube_uri(term, country \\ "en", language \\ "en") do
    @youtube_endpoint
      <> "?q="
      <> URI.encode(term)
      <> @youtube_queryparams
      <> "hl="
      <> String.downcase(language)
      <> "&gl="
      <> String.upcase(country)
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