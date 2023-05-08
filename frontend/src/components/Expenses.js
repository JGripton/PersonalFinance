import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, 
  TextField, Button, Checkbox, Box, IconButton, MenuItem} 
  from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { useAuth } from './AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', date: '', amount: '', description: '' });
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState({});
  const { refreshToken } = useAuth();

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const handleEditButtonClick = () => {
    setEditing(true);
  };

  const fetchCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get('http://localhost:8000/api/category/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCategories(response.data);
      console.log('Categories response data:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response.status === 401) {
        await refreshToken();
        fetchCategories();
      }
    }
  };

  const fetchExpenses = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get('http://localhost:8000/api/expenses/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setExpenses(response.data);
      console.log('Expenses response data:', response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      if (error.response.status === 401) {
        await refreshToken();
        fetchExpenses();
      }
    }
  };

  const addExpense = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        'http://localhost:8000/api/expenses/',
        JSON.stringify(newExpense),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setExpenses([...expenses, response.data]);
      setNewExpense({ category: '', date: '', amount: '', description: '' });
    } catch (error) {
      console.error('Error adding expense:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data, 'Status:', error.response.status);
        if (error.response.status === 401) {
          refreshToken();
        }
      }
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8000/expenses/${expenseId}/delete/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting expense ${expenseId}:`, error);
      if (error.response.status === 401) {
        await refreshToken();
        deleteExpense(expenseId);
      }
    }
  };  

  const handleSaveButtonClick = async () => {
    // Remove selected expenses
    for (const expenseId in checkedStatus) {
      if (checkedStatus[expenseId]) {
        await deleteExpense(expenseId);
      }
    }
  
    // Update the local state
    setExpenses(expenses.filter((expense) => !checkedStatus[expense.id]));
    setCheckedStatus({});
    setEditing(false);
  };
  
  const handleCancelButtonClick = () => {
    setEditing(false);
  };

  const handleCheckboxChange = (event, expenseId) => {
    console.log('Expense ID:', expenseId, 'Checked:', event.target.checked);
    setCheckedStatus((prevState) => ({
      ...prevState,
      [expenseId]: event.target.checked,
    }));
  };

  return (
    <Container>
      <StyledPaper>
        <Table>
          <TableHead>
            <TableRow>
              {editing && (
                <TableCell>
                  <IconButton edge="end" color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              )}
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={"row" + expense.id}>
                {editing && (
                  <TableCell>
                    <Checkbox
                      checked={checkedStatus[expense.id] || false}
                      onChange={(event) => handleCheckboxChange(event, expense.id)}
                    />
                  </TableCell>
                )}
                <TableCell>{categories.filter(category => category.id === expense.category).map(category => category.name)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>${expense.amount}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
      <TextField
        select
        label="Category"
        value={newExpense.category}
        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
        fullWidth
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Date"
        type="date"
        value={newExpense.date}
        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Amount"
        type="number"
        value={newExpense.amount}
        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        fullWidth
      />
      <TextField
        label="Description"
        value={newExpense.description}
        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
        fullWidth
      />
      
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={addExpense} sx={{ marginRight: "auto" }}>
          Add Expense
        </Button>
        {!editing ? (
          <Button variant="contained" color="primary" onClick={handleEditButtonClick} sx={{ marginLeft: "16px" }}>
            Edit Expenses
          </Button>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleSaveButtonClick} sx={{ marginLeft: "16px" }}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelButtonClick} sx={{ marginLeft: "16px" }}>
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Expenses;
