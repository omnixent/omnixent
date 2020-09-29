defmodule Omnixent.Mnesia do
  use Memento.Table, 
    attributes: [
      :id,
      :uuid,
      :searchid,
      :term,
      :original_term,
      :result,
      :country,
      :language,
      :service,
      :date
    ],
    index: [
      :uuid,
      :term,
      :searchid,
      :country,
      :language,
      :service
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

  def insert_result(item, original_term, country, language, service, uuid) do
    with {:ok, term, result} = item do
      Memento.transaction! fn ->
        current_date = Omnixent.Utils.current_date
        Memento.Query.write(%Omnixent.Mnesia{
          uuid:          uuid,
          term:          term,
          original_term: original_term,
          result:        result,
          country:       country,
          language:      language,
          searchid:      format_search_id(term, country, language, current_date, service),
          service:       service,
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

  def check_if_exist(term, country, language, service) do
    Memento.transaction! fn ->
      guards = [
        {:==, :original_term, term},
        {:==, :country,       country},
        {:==, :language,      language},
        {:==, :service,       service}
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

  def check_if_exist(term, country, language, service, date) do
    Memento.transaction! fn ->
      guards = [
        {:==, :original_term, term},
        {:==, :country,       country},
        {:==, :language,      language},
        {:==, :service,       service},
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

  def get_by_uuid(uuid) do
    Memento.transaction! fn ->
      guards = [
        {:==, :uuid, uuid}
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

  def format_search_id(term, country, language, date, service) do
    [term, country, language, date, service]
      |> Enum.join("-")
      |> String.replace(~r[/\s/gi], "_")
  end

  def store_to_mnesia(item, original_term, country, language, service, uuid) do
    case item do
      {:ok, _, result} ->
        Omnixent.Mnesia.insert_result(item, original_term, country, language, service, uuid)
        {:ok, result}
      _ ->
       IO.inspect item 
       {:error, "Unknown error while inserting to Mnesia"}
    end
  end  

end