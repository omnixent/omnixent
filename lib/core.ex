defmodule Omnixent.Core do
  use Application

  def start do
    Omnixent.Mnesia.persist()
  end

  def availability do
    %{
      services: available_services,
      countries: available_countries,
      languages: available_languages
    }
  end

  def available_services() do
    [
      :google,
      :youtube,
      :amazon
    ]
  end

  def available_countries do
    [
      :us,
      :uk,
      :it,
      :fr,
      :de,
      :at,
      :br,
      :pt,
      :ao,
      :cv,
      :st,
      :gw,
      :mz
    ]
  end

  def available_languages do
    [
      :en,
      :it,
      :fr,
      :de,
      :pt
    ]
  end
end
