defmodule Omnixent.Utils.Test do
  use ExUnit.Case
  alias Omnixent.Utils
  doctest Omnixent.Utils

  test "typeof should return the correct type of a variable" do
    assert Utils.typeof(15)         == :number
    assert Utils.typeof(199.99)     == :float
    assert Utils.typeof(:atom)      == :atom
    assert Utils.typeof("string")   == :binary
    assert Utils.typeof(<<67,29>>)  == :binary
    assert Utils.typeof([192,10,2]) == :list
    assert Utils.typeof({:ok})      == :tuple
  end

  test "current_date should return a number" do
    assert Utils.typeof(Utils.current_date) == :number 
  end

  test "yesterday should return a number" do
    assert Utils.typeof(Utils.yesterday) == :number 
  end

  test "last_week_day should return a number" do
    assert Utils.typeof(Utils.last_week_day) == :number 
  end

  test "safe_json_decode should safely decode a JSON" do
    assert Utils.safe_json_decode("{\"key\": \"value\"}") == %{"key" => "value"}
    assert Utils.safe_json_decode("{}") == %{}
    assert Utils.safe_json_decode("{\"wrong_json\"}") == %{}
  end

end