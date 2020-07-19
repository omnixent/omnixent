defmodule Core do
  use Application

  def start do
    Core.Mnesia.persist
  end

end
