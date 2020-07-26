defmodule CoreTest do
  use ExUnit.Case
  doctest Core

  test "greets the world" do
    assert Omnixent.hello() == :world
  end
end
