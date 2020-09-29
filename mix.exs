defmodule Omnixent.MixProject do
  use Mix.Project

  @app     :omnixent
  @name    "Omnixent"
  @version "0.0.5"
  @github  "https://github.com/omnixent/#{@app}"

  def project do
    [
      app:             @app,
      version:         @version,
      elixir:          "~> 1.10",
      build_embedded:  Mix.env == :prod,
      start_permanent: Mix.env() == :prod,
      deps:            deps(),

      package:         package(),
      description:     description(),
      source_url:      @github,
      homepage_url:    @github,
      docs: [
        main:          @name,
        canonical:     "https://hexdocs.pm/#{@app}",
        extras:        ["README.md"]
      ]
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :mnesia]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:httpoison,   "~> 1.6"},
      {:poison,      "~> 3.1"},
      {:memento,     "~> 0.3.1"},
      {:timex,       "~> 3.5"},
      {:elixir_uuid, "~> 1.2" },
      {:ex_doc,      ">= 0.0.0", only: :dev, runtime: false}
    ]
  end

  defp package() do
    [
      author:      "Michele Riva <ciao@micheleriva.it>",
      maintainers: ["Michele Riva"],
      licenses:    ["GPLv3"],
      links:       %{"GitHub" => "https://github.com/omnixent/omnixent"}
    ]
  end

  defp description() do
    "A simple API which lets you to understand what people searches on the internet."
  end
end
