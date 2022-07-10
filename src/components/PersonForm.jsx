import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_PERSONS } from "../queries";
import { CREATE_PERSON } from "../mutations";

const PersonForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submit = (evt) => {
    evt.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>
        <div>
          phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          ></input>
        </div>
        <div>
          street
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          ></input>
        </div>
        <div>
          city
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PersonForm;
