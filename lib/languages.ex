defmodule Core.Languages do

  def read_languages_file(lang \\ "en") do
    with {:ok, content} = File.read("./priv/languages/#{lang}.txt") do
      content
        |> String.split("\n")
        |> Enum.filter(& &1 != "")
        |> Enum.map(& String.trim(&1))
    end
  end

end