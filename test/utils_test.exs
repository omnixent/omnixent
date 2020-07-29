defmodule OmnixentUtilsTest do
  use ExUnit.Case
  alias Omnixent.Utils
  doctest Omnixent.Utils

  test "current_date should return a number" do
    assert Utils.typeof(Utils.current_date) == :number 
  end
end