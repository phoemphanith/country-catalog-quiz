import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");

      setCountries(sortCountries(data, "asc"));
    };
    fetchCountries();
  }, []);

  async function handleSearch(event) {
    if (event.target.value !== "") {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${event.target.value}`
      );
      setTimeout(setCountries(data), 3000);
    }
  }

  async function handleSelect(event) {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    if (event.target.value === "asc") {
      setCountries(sortCountries(data, "asc"));
    } else if (event.target.value === "desc") {
      setCountries(sortCountries(data, "desc"));
    }
  }

  function sortCountries(data, type) {
    if (type === "asc") {
      return data.sort((a, b) => {
        if (a.name.official < b.name.official) {
          return -1;
        }
        if (a.name.official > b.name.official) {
          return 1;
        }
        return 0;
      });
    } else if (type === "desc") {
      return data.sort((b, a) => {
        if (a.name.official < b.name.official) {
          return -1;
        }
        if (a.name.official > b.name.official) {
          return 1;
        }
        return 0;
      });
    }
  }

  return (
    <div className="container-fluid py-4">
      <div className="mb-3">
        <label for="exampleFormControlInput1" className="form-label">
          Country Name
        </label>
        <div className="search__form">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search input"
            onChange={handleSearch}
          />
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSelect}
          >
            <option selected disabled>
              Sort By
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Flags</th>
              <th scope="col">Country Name</th>
              <th scope="col">Country Code(2 digit)</th>
              <th scope="col">Country Code(3 digit)</th>
              <th scope="col">Native Country Name</th>
              <th scope="col">Alternative Country Name</th>
              <th scope="col">Country Calling Codes</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={country.flags.png}
                    className="rounded"
                    style={{ width: "60px" }}
                    alt="image"
                  />
                </td>
                <td>{country.name.official}</td>
                <td>{country.cca2 || "-"}</td>
                <td>{country.ccn3 || "-"}</td>
                <td>
                  {typeof country.name.nativeName?.zho != "undefined"
                    ? country.name.nativeName?.zho.official
                    : "-"}
                </td>
                <td>{country.altSpellings || "-"}</td>
                <td>{country.idd.root || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
