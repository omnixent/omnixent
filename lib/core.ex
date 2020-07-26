defmodule Core do
  use Application

  def start do
    Omnixent.Mnesia.persist
  end

end
