defmodule Omnixent.Utils do
  use Timex

  @doc"""
  Returns the current date as an integer value.

  ## Examples

  iex(1)> Omnixent.Utils.current_date
  2020726
  """
  def current_date do
    Timex.today
      |> date_to_int
  end

  @doc"""
  Returns yesterday's date as an integer value.

  ## Examples

  iex(1)> Omnixent.Utils.yesterday
  2020725
  """
  def yesterday do
    Timex.today
      |> Timex.shift(days: -1)
      |> date_to_int
  end

  @doc"""
  Returns the date of 7 days ago as an integer value.

  ## Examples

  iex(1)> Omnixent.Utils.last_week_day
  2020719
  """
  def last_week_day do
    Timex.today
      |> Timex.shift(days: -7)
      |> date_to_int
  end

  @doc"""
  Formats a date value into an integer.

  ## Examples

  iex(1)> Omnixent.Utils.date_to_int(~D[2020-07-26])
  2020726
  """
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
        IO.puts     "Error while parsing JSON:"
        IO.inspect  reason
        %{}
      _ ->
        %{}
    end
  end

end