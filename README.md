<img src="/docs/logo/omnixent.png" width="100%" />

**Omnixent** is a community effort to build a simple API which allows you to understand what people searches on search engines, social network etc.

🎉 Read the announcement post [here](https://www.micheleriva.it/posts/2020-07-27-introducing-omnixent)!

## Index

- [Index](#index)
- [Status](#status)
- [API Example](#api-example)
  - [Elixir Native API](#elixir-native-api)
  - [REST API](#rest-api)
  - [GraphQL API](#graphql-api)
- [Installation](#installation)
- [License](#license)

## Status

**Omnixent** is still under active development, but you can already start to use the following APIs (list will be updated as soon as new features will roll out).

- ✅ Ready
- 🚧 Under active development
- 🛣 In roadmap

| Search Engine | Status |
|--------------|---------|
| Google       |   ✅    |
| YouTube      |   ✅    |
| Facebook     |   🛣    |
| Twitter      |   🛣    |
| Amazon       |   🚧    |
| Bing         |   🛣    |
| Yandex       |   🛣    |
| DuckDuckGo   |   🛣    |
| Baidu        |   🛣    |

## API Example

**Omnixent** is entirely written in **Elixir**, so that it can take advantage of using some well known **OTP** features such as **Mnesia**. In fact, it doesn't depend on external tools/databases for storing data, generating APIs, cache etc.

### Elixir Native API

```bash
iex> Omnixent.Services.Google.search("java", "en", "us")
[
  %{
    term: "java",
    results: ["java", "javascript", "java vs javascript", "java 10 repl", "java jdk"]
  },
  %{
    term: "when java",
    results: ["when javascript", "when java was developed", "when java 1.8 released"]
  },
  ...
]
```

### REST API

**Omnixent** also provides some really useful REST APIs:

```bash
curl -X GET https://localhost:4000?term=java,language=en&country=us

[
  {
    "term": "java",
    "results": ["java", "javascript", "java vs javascript", "java 10 repl", "java jdk"]
  },
  {
    "term": "when java",
    "results": ["when javascript", "when java was developed", "when java 1.8 released"]
  },
  ...
]
```

### GraphQL API

In the next releases, **Omnixent** will also support **GraphQL**:

```graphql
query Search($term: String!, $country: String!, $language: String!) {
  google(where: { _and: { _eq: { term: $term, country: $country, language $language } }}) {
    when,
    where,
  },
  youtube(where: { _and: { _eq: { term: $term, country: $country, language $language } }}) {
    when,
    where,
  }
}
```

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `Omnixent` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:omnixent, "~> 0.0.1"}
  ]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/core](https://hexdocs.pm/core).

## License

**Omnixent** is licensed under the [GPLv3 License](/LICENSE.md)
