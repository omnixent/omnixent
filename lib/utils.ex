defmodule Omnixent.Utils do
  use Timex

  def current_date do
    Timex.today
      |> date_to_int
  end

  def yesterday do
    Timex.today
      |> Timex.shift(days: -1)
      |> date_to_int
  end

  def last_week_day do
    Timex.today
      |> Timex.shift(days: -7)
      |> date_to_int
  end

  def typeof(self) do
    cond do
      is_float(self)    -> :float
      is_number(self)   -> :number
      is_atom(self)     -> :atom
      is_boolean(self)  -> :boolean
      is_binary(self)   -> :binary
      is_function(self) -> :function
      is_list(self)     -> :list
      is_tuple(self)    -> :tuple
      true              -> :unknown
    end    
  end

  defp date_to_int(date) do
    with d = date.day, m = date.month, y = date.year do
      with {date, _} = Integer.parse "#{y}#{m}#{d}" do
        date
      end 
    end
  end

  def safe_json_decode(json) do
    case Poison.decode(json) do
      {:ok, result} ->
        result
      {:error, reason} ->
        IO.puts "Error while parsing JSON: " <> json
        IO.inspect reason
        %{}
      _ ->
        IO.puts "Unknown error while parsing JSON: " <> json
        %{}
    end
  end

end