defmodule Omnixent.Services.Amazon do
  @amazon_endpoint    "https://completion.amazon.co.uk/api/2017/suggestions"
  @amazon_queryparams "?page-type=Gateway&client-info=amazon-search-ui&mid=APJ6JRA9NG5V4&alias=aps&suggestion-type=KEYWORD"

  @spec format_uri(string, atom, atom) :: string
  def format_uri(term, country, language) do
    @amazon_endpoint
      <> @amazon_queryparams
      <> "&prefix="
      <> URI.encode(term)
      <> "&lop="
      <> String.downcase(Atom.to_string(country))
      <> "_"
      <> String.upcase(Atom.to_string(language))
  end

  @spec extract_body(binary) :: list(string)
  def extract_body(response) do
    "#{:erlang.binary_to_list(response)}"
      |> Omnixent.Utils.safe_json_decode
      |> Map.get("suggestions")
      |> Enum.map(& Map.get(&1, "value"))
  end

end