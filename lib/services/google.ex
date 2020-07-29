defmodule Omnixent.Services.Google do

  @google_endpoint    "https://www.google.com/complete/search?q="
  @google_queryparams "&client=psy-ab&"

  @spec format_uri(string, atom, atom) :: string
  def format_uri(term, country, language) do
    @google_endpoint
      <> URI.encode(term)
      <> @google_queryparams
      <> "hl="
      <> String.downcase(Atom.to_string(country))
      <> "-"
      <> String.upcase(Atom.to_string(language))
  end

  @spec extract_body(binary) :: list(string)
  def extract_body(response) do
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