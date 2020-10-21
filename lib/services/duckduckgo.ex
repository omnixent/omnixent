defmodule Omnixent.Services.DuckDuckGo do
  @duckduckgo_endpoint "https://duckduckgo.com/ac/?q="
  @duckduckgo_queryparams "&client=psy-ab&"

  @spec format_uri(string, atom, atom) :: string
  def format_uri(term, country, language) do
    @duckduckgo_endpoint <>
      URI.encode(term) <>
      @duckduckgo_queryparams <>
      "kl=" <>
      String.downcase(Atom.to_string(country)) <>
      "-" <>
      String.downcase(Atom.to_string(language))
  end

  @spec extract_body(binary) :: list(string)
  def extract_body(response) do
    "#{:erlang.binary_to_list(response)}"
    |> Omnixent.Utils.safe_json_decode()
    |> Enum.map(fn a -> a["phrase"] end)
  end
end
