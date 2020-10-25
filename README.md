<img src="/docs/logo/omnixent.png" width="100%" />

**Omnixent** is a community effort to build a simple API which allows you to understand what people searches on search engines, social network etc.

🎉 Read the announcement post [here](https://www.micheleriva.it/posts/2020-07-27-introducing-omnixent)!

## Index

- [Index](#index)
- [Docs](#docs)
- [Status](#status)
- [API Example](#api-example)
  - [Elixir Native API](#elixir-native-api)
  - [REST API](#rest-api)
  - [GraphQL API](#graphql-api)
- [Installation](#installation)
- [License](#license)

<h3 align="center"> Built by </h3>

<div align="center">
  <table>
    <tr>
      <td align="center" valign="middle">
        <a href="https://www.hackdoor.io?utm_source=github.com/omnixent/omnixent">
          <img src="/assets/github/logo-hackdoor.png" width="222px" style="max-width:100%;" alt="Hackdoor" />
        </a>
      </td>
      <td align="center" valign="middle">
        <a href="https://www.lotrek.it?utm_source=github.com/omnixent/omnixent">
          <img src="/assets/github/logo_lotrek.png" width="222px" style="max-width:100%;" alt="Lotrék" />
        </a>
      </td>
    </tr>
  </table>
</div>

## Docs
- [REST API docs](https://docs.oss.omnixent.com)
- [Project Architecture](https://architecture.omnixent.com)

## Status

**Omnixent** is still under active development, but you can already start to use the following APIs (list will be updated as soon as new features will roll out).

- ✅  Ready
- 🚧  Under active development
- 🛣  In roadmap

| Search Engine | Status |
|--------------|---------|
| Google       |   ✅    |
| YouTube      |   ✅    |
| Amazon       |   ✅    |
| DuckDuckGo   |   ✅    |
| Facebook     |   🛣    |
| Twitter      |   🛣    |
| Bing         |   🚧    |
| Yandex       |   🚧    |
| Baidu        |   🛣    |



## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `Omnixent` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:omnixent, "~> 0.0.8"}
  ]
end
```

## License

**Omnixent** is licensed under the [GPLv3 License](/LICENSE.md)
