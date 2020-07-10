defmodule Core do
  use Application

  def start(_, _) do
    Core.Mnesia.persist
  end

end
