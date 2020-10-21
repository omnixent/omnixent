defmodule Omnixent.Services.Test do
  use ExUnit.Case
  alias Omnixent.Services.Google
  alias Omnixent.Services.Youtube
  alias Omnixent.Services.DuckDuckGo
  doctest Omnixent.Services

  test "Google.format_uri should correctly format a valid Google URI" do
    Google.format_uri("java", :us, :en) == "https://www.google.com/complete/search?q=java&client=psy-ab&hl=us-EN"
  end

  test "Youtube.format_uri should correctly format a valid Youtube URI" do
    Youtube.format_uri("java", :us, :en) == "https://clients1.google.com/complete/search?q=java&client=youtube&gs_ri=youtubehl=en&gl=US"
  end
  
  test "DuckDuckGo.format_uri should correctly format a valid DuckDuckGo URI" do
    DuckDuckGo.format_uri("java", :us, :en) == "https://duckduckgo.com/ac/?q=java&client=psy-ab&kl=en-us"
  end
end