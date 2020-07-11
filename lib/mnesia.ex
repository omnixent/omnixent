defmodule Core.Mnesia do
  use Memento.Table, 
    attributes: [:id, :term, :result, :country, :language, :date],
    index: [:term, :country, :language],
    type: :ordered_set,
    autoincrement: true

  @nodes [node()]

  def persist do
    Memento.stop
    Memento.Schema.create(@nodes)
    Memento.start

    Memento.Table.create!(Core.Mnesia, disc_copies: @nodes)
  end

  def insert_result(item, country, language) do
    with {:ok, term, result} = item do
      Memento.transaction! fn ->
        Memento.Query.write(%Core.Mnesia{
          term:     term,
          result:   result,
          country:  country,
          language: language,
          date:     Core.Utils.current_date
        })
      end
    end
  end

  def check_if_exist?(term, country, language) do
    Memento.transaction! fn ->
      guards = [
        {:==, :term,     term},
        {:==, :country,  country},
        {:==, :language, language},
      ]
      result = Memento.Query.select(Core.Mnesia, guards)
      length(result) > 0
    end
  end

  def check_if_exist?(term, country, language, date) do
    Memento.transaction! fn ->
      guards = [
        {:==, :term,     term},
        {:==, :country,  country},
        {:==, :language, language},
        {:>=, :date,     date}
      ]
      result = Memento.Query.select(Core.Mnesia, guards)
      length(result) > 0
    end
  end

end