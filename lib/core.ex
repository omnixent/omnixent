defmodule Omnixent.Core do
  use Application

  def start do
    Omnixent.Mnesia.persist
  end

  def available_services() do
    [
      :google,
      :youtube
    ]
  end

  def available_countries do
    [
      :us,
      :uk,
      :it,
      :fr
    ]
  end

  def available_languages do
    [
      :en,
      :it,
      :fr
    ]
  end

end
