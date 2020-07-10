defmodule Core.Mnesia do
  use Memento.Table, 
    attributes: [:id, :term, :search, :result],
    index: [:term, :search],
    type: :ordered_set,
    autoincrement: true

  @nodes [node()]

  def persist do
    Memento.stop
    Memento.Schema.create(@nodes)
    Memento.start

    Memento.Table.create!(__MODULE__, disc_copies: @nodes)
  end

  def insert_result(item) do
    with {:ok, term, result} = item do
      Memento.Query.write(%__MODULE__{
        term:   term,
        search: term,
        result: result
      })
    end
  end

end