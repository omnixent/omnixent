defmodule Core.Endpoint do

  @google_endpoint    "https://www.google.com/complete/search?q="
  @google_queryparams "&client=psy-ab&"
  @search_terms [
    "@",

    "what @",    "why @",   "when @",
    "where @",   "how @",   "is @", 
    "who @",     "can @",   "does @",
    "doesn't @", "with @",  "without @",
    "for @",     "to @",    "from @",
    "which @",

    "@ what",    "why @",   "@ when",
    "@ where",   "@ how",   "@ is",
    "@ who",     "@ can",   "@ does",
    "@ doesn't", "@ with",  "@ without",
    "@ for",     "@ to",    "@ from",

    "@ vs",      "@ versus", "@like",
    "@ and",     "@ or",

    "@ a", "@ b", "@ c", "@ d", "@ e",
    "@ f", "@ g", "@ h", "@ i", "@ j",
    "@ k", "@ l", "@ m", "@ n", "@ o",
    "@ p", "@ q", "@ r", "@ s", "@ t",
    "@ u", "@ v", "@ w", "@ x", "@ y",
    "@ z"
  ]

  def google(term, country, language) do
    @search_terms
      |> Enum.map(& String.replace(&1, "@", term))
      |> Enum.map(& call_google(&1, country, language))
      |> Enum.map(& store_to_mnesia(&1, term, country, language, "google"))
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
      |> safe_json_decode
      |> Enum.at(1)
      |> Enum.map(& 
        &1 
        |> hd
        |> String.replace("<b>", "")
        |> String.replace("</b>", "")
        |> String.replace("&#39;", "'")
      )
  end

  def safe_json_decode(json) do
    case Poison.decode(json) do
      {:ok, result} ->
        result
      {:error, reason} ->
        IO.puts     "Error while parsing JSON:"
        IO.inspect  reason
        %{}
      _ ->
        %{}
    end
  end

  def store_to_mnesia(item, original_term, country, language, platform) do
    case item do
      {:ok, _, result} ->
        Core.Mnesia.insert_result(item, original_term, country, language, platform)
        {:ok, result}
      _ ->
       IO.inspect item 
       {:error, "Unknown error while inserting to Mnesia"}
    end
  end

end