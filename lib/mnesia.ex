defmodule Omnixent.Mnesia do
  use Memento.Table, 
    attributes: [
      :id,
      :searchid,
      :term,
      :original_term,
      :result,
      :country,
      :language,
      :platform,
      :date
    ],
    index: [
      :term,
      :searchid,
      :country,
      :language,
      :platform
    ],
    type: :ordered_set,
    autoincrement: true

  @nodes [node()]

  def persist do
    Memento.stop
    Memento.Schema.create(@nodes)
    Memento.start

    Memento.Table.create!(Omnixent.Mnesia, disc_copies: @nodes)
  end

  def insert_result(item, original_term, country, language, platform) do
    with {:ok, term, result} = item do
      Memento.transaction! fn ->
        current_date = Omnixent.Utils.current_date
        Memento.Query.write(%Omnixent.Mnesia{
          term:          term,
          original_term: original_term,
          result:        result,
          country:       country,
          language:      language,
          searchid:      format_search_id(term, country, language, current_date, platform),
          platform:      platform,
          date:          current_date
        })
      end
    end
  end

  def check_if_exist(guards) do
    Memento.transaction! fn ->
      result = Memento.Query.select(Omnixent.Mnesia, guards)
      case length(result) > 0 do
        true ->
          {:true, result}
        false ->
          {:false}
      end
    end
  end

  def check_if_exist(term, country, language) do
    Memento.transaction! fn ->
      guards = [
        {:==, :original_term, term},
        {:==, :country,       country},
        {:==, :language,      language},
      ]
      result = Memento.Query.select(Omnixent.Mnesia, guards)
      case length(result) > 0 do
        true ->
          {:true, result}
        false ->
          {:false}
      end
    end
  end

  def check_if_exist(term, country, language, date) do
    Memento.transaction! fn ->
      guards = [
        {:==, :original_term, term},
        {:==, :country,       country},
        {:==, :language,      language},
        {:>=, :date,          date}
      ]
      result = Memento.Query.select(Omnixent.Mnesia, guards)
      case length(result) > 0 do
        true ->
          {:true, result}
        false ->
          {:false}
      end
    end
  end

  def format_search_id(term, country, language, date, platform) do
    [term, country, language, date, platform]
    |> Enum.join("-")
  end

end