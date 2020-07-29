defmodule Omnixent.Services.Youtube do

  @youtube_endpoint    "https://clients1.google.com/complete/search"
  @youtube_queryparams "&client=youtube&gs_ri=youtube"

  @spec format_uri(string, atom, atom) :: string
  def format_uri(term, country, language) do
    @youtube_endpoint
      <> "?q="
      <> URI.encode(term)
      <> @youtube_queryparams
      <> "hl="
      <> String.downcase(Atom.to_string(language))
      <> "&gl="
      <> String.upcase(Atom.to_string(country))
  end

  @spec extract_body(binary) :: list(string)
  def extract_body(result) do
    try do
      "#{:erlang.binary_to_list(result)}"
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