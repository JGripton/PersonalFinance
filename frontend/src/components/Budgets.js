import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 
{ Container, Table, Card, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, Checkbox, 
  Box, IconButton, MenuItem, Grid, CardContent, Typography, ListItem, ListItemIcon, ListItemText} 
  from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { useAuth } from './AuthContext';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryContainer } from 'victory';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const useStyles = {
  root: {
    flexGrow: 1,
  },
  card: {
    padding: '16px',
  },
  cardContent: {
    minHeight: '190px',
    maxHeight: '190px',
    position: 'relative',
  },
};

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: '', amount: '', current_amount: '', start_date: '', end_date: '' });
  const [editing, setEditing] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState({});
  const { refreshToken } = useAuth();

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
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

  const fetchBudgets = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get('http://localhost:8000/api/budget/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBudgets(response.data);
      console.log('Budgets response data:', response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
      if (error.response.status === 401) {
        await refreshToken();
        fetchBudgets();
      }
    }
  };

  const addBudget = async () => {
    try {
      setNewBudget({ ...newBudget, current_amount: 0 })
      const accessToken = localStorage.getItem("accessToken");
      const budgetWithCurrentAmount = { ...newBudget, current_amount: 0 };
      const response = await axios.post(
        'http://localhost:8000/api/budget/',
        JSON.stringify(budgetWithCurrentAmount),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setBudgets([...budgets, response.data]);
      setNewBudget({id: '', category: '', amount: '', current_amount: '', start_date: '', end_date: '',});
      //
    } catch (error) {
      console.error('Error adding budget:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data, 'Status:', error.response.status);
        if (error.response.status === 401) {
          refreshToken();
        }
      }
    }
  };

  const deleteBudget = async (budgetId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8000/budget/${budgetId}/delete/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting budget ${budgetId}:`, error);
      if (error.response.status === 401) {
        await refreshToken();
        deleteBudget(budgetId);
      }
    }
  };

  const handleSaveButtonClick = async () => {
    // Remove selected budgets
    for (const budgetId in checkedStatus) {
      if (checkedStatus[budgetId]) {
        await deleteBudget(budgetId);
      }
    }
  
    // Update the local state
    setBudgets(budgets.filter((budget) => !checkedStatus[budget.id]));
    setCheckedStatus({});
    setEditing(false);
  };

  const handleCancelButtonClick = () => {
    setEditing(false);
  };

  const handleCheckboxChange = (event, budgetId) => {
    setCheckedStatus((prevState) => ({
      ...prevState,
      [budgetId]: event.target.checked,
    }));
  };

  //Graph related functions and data
  const dataCurrentAmount = budgets.map((budget, index) => {
    const category = categories.find(category => category.id === budget.category)?.name || '';
    const currentAmount = Math.min(parseInt(budget.current_amount, 10), budget.amount);
  
    return {
      category,
      currentAmount,
      index: index + 1,
    };
  });
  console.log('dataCurrentAmount:', dataCurrentAmount);
  
  const dataDifference = budgets.map((budget, index) => {
    const category = categories.find(category => category.id === budget.category)?.name || '';
    const difference = budget.current_amount < budget.amount ? budget.amount - budget.current_amount : 0;
  
    return {
      category,
      difference,
      index: index + 1,
    };
  });
  console.log('dataDifference:', dataDifference);
  
  const dataExcess = budgets.map((budget, index) => {
    const category = categories.find(category => category.id === budget.category)?.name || '';
    const excess = budget.current_amount > budget.amount ? budget.current_amount - budget.amount : 0;
  
    return {
      category,
      excess,
      index: index + 1,
    };
  });
  
  //Calculates the highest value on the graph and rounds to the nearest hundred for the Y axis ticks
  const maxCurrentAmount = Math.max(...dataCurrentAmount.map(data => data.currentAmount));
  const maxDifference = Math.max(...dataDifference.map(data => data.difference));
  const maxExcess = Math.max(...dataExcess.map(data => data.excess));
  const maxValue = Math.max(maxCurrentAmount, maxDifference, maxExcess);
  const roundedMaxValue = Math.ceil(maxValue / 100) * 100;
  const tickCount = 6;
  // Calculate the tick interval for even distribution
  const tickInterval = roundedMaxValue / (tickCount - 1);
  // Generate tick values
  const tickValues = Array.from({ length: tickCount }, (_, i) => i * tickInterval);



  return (
    <Container>
      <Grid container spacing={4} style={{ marginTop: '32px' }}>
        <Grid item xs={12} sm={12} md={12}>
          
              <ListItem disableGutters>
              <VictoryChart
                domainPadding={20}
                theme={VictoryTheme.material}
                domain={{ y: [0, roundedMaxValue] }}
                width={300}
                height={250}
                containerComponent={<VictoryContainer responsive={true} aspectRatio={1} />}
              >
                <VictoryAxis
                  tickValues={dataCurrentAmount.map(data => data.index)}
                  tickFormat={dataCurrentAmount.map(data => data.category)}
                />
                <VictoryAxis
                  dependentAxis
                  tickValues={tickValues}
                  tickFormat={(x) => `$${x}`}
                />
                <VictoryStack>
                  <VictoryBar
                    data={dataCurrentAmount}
                    x="index"
                    y="currentAmount"
                  />
                  <VictoryBar
                    data={dataDifference}
                    x="index"
                    y="difference"
                  />
                  <VictoryBar
                    data={dataExcess}
                    x="index"
                    y="excess"
                    style={{ data: { fill: '#c43a31' } }}
                  />
                </VictoryStack>
              </VictoryChart>
              </ListItem>
            
        </Grid>
      </Grid>  
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
              <TableCell>Target</TableCell>
              <TableCell>Current Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={"row" + budget.id}>
                {editing && (
                  <TableCell>
                    <Checkbox
                      checked={checkedStatus[budget.id] || false}
                      onChange={(event) => handleCheckboxChange(event, budget.id)}
                    />
                  </TableCell>
                )}
                <TableCell>{categories.filter(category => category.id === budget.category).map(category => category.name)}</TableCell>
                <TableCell>{budget.amount}</TableCell>
                <TableCell>{budget.current_amount}</TableCell>
                <TableCell>{budget.start_date}</TableCell>
                <TableCell>{budget.end_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
      <TextField
        select
        label="Category"
        value={newBudget.category}
        onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
        fullWidth
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Amount"
        type="number"
        value={newBudget.amount}
        onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
        fullWidth
      />
      <TextField
        label="Start Date"
        type="date"
        value={newBudget.start_date}
        onChange={(e) => setNewBudget({ ...newBudget, start_date: e.target.value })}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="End Date"
        type="date"
        value={newBudget.end_date}
        onChange={(e) => setNewBudget({ ...newBudget, end_date: e.target.value })}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={addBudget} sx={{ marginRight: "auto" }}>
          Add Budget
        </Button>
        {!editing ? (
          <Button variant="contained" color="primary" onClick={handleEditButtonClick} sx={{ marginLeft: "16px" }}>
            Edit Budgets
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

export default Budgets;
