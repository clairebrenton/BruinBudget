import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap"
import IncomeDataService from "./income.services";
import { useAuth } from '../../context/UserAuthContext'
import { db, auth } from "../../firebase.config";
import "./expenselist.css";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from "firebase/firestore";



const IncomeList = ({ getIncomeId }) => {
  const [income, setIncome] = useState([]);
  const [totalIncome, getTotalIncome] = useState(0);
  useEffect(() => {
    getIncome();
  }, []);
/*
  const getIncome = async () => {
    const userId = auth.currentUser.uid; // get the current user's ID
    const data = await IncomeDataService.getAllIncome();
    console.log(data.docs);
    setIncome(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((income) => income.userId === userId)); // filter budgets based on userId
    const filteredIncomes = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((income) => income.userId === auth.currentUser.uid);
    const total = filteredIncomes.reduce(
      (accumulator, income) => accumulator + parseFloat(income.amount),
      0
    );
    getTotalIncome(total);
  };
*/
const getIncome = async () => {
  const userId = auth.currentUser.uid; // get the current user's ID
  const data = await IncomeDataService.getAllIncome();
  console.log(data.docs);
  setIncome(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((income) => income.userId === userId)); // filter budgets based on userId
  const filteredIncomes = data.docs
    .map((doc) => ({ ...doc.data(), id: doc.id }))
    .filter((income) => income.userId === auth.currentUser.uid);
  const total = filteredIncomes.reduce(
    (accumulator, income) => accumulator + parseFloat(income.amount),
    0
  );
  getTotalIncome(total);
};

  const deleteHandler = async (id) => {
    await IncomeDataService.deleteIncome(id);
    getIncome();
  };


  
  return (
    <>
   <div className="list-container">
     <div className="incomelist">
     <div className="mb-2">
        <button variant="primary" type="Submit" onClick={getIncome}>
          Refresh Income
        </button>
      </div>
      <table striped bordered hover size="sm" >
        <thead>
          <tr>
            <th>#</th>
            <th>Income Name</th>
            <th>Income Amount</th>
            <th>Income Date</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {income.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.amount}</td>
                <td>{doc.date}</td>
                <td>{doc.notes}</td>
                <td>
                  <button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getIncomeId(doc.id)}
                  >
                    Edit
                  </button>
                  <button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </div>     
    </>
  );
};

export default IncomeList;

