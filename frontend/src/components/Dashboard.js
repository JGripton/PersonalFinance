import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, ListItem, ListItemIcon, ListItemText, Box, } from '@mui/material';
import { styled } from '@mui/system';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PaymentIcon from '@mui/icons-material/Payment';
import SavingsIcon from '@mui/icons-material/Savings';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import Categories from './Categories';
import Budgets from './Budgets';
import SavingsGoals from './SavingsGoals';
import Expenses from './Expenses';
import Bills from './Bills';
import Incomes from './Incomes';

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

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'categories':
        return <Categories />;
      case 'budgets':
        return <Budgets />;
      case 'savings':
        return <SavingsGoals />;
      case 'expenses':
        return <Expenses />;
      case 'bills':
        return <Bills />;
      case 'incomes':
        return <Incomes />;  
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={useStyles.root}>
      <Grid container spacing={4} style={{ marginTop: '32px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardContent style={useStyles.cardContent}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <CategoryIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Categories
                    </Typography>
                  }
                  secondary="Manage your categories. View, add, edit, and delete categories for your budget."
                />
              </ListItem>
              <Box position="absolute" bottom={5}>
                <Typography component="a" onClick={() => handleComponentSelect('categories')} color="primary">
                  Go to Categories
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardContent sx={useStyles.cardContent}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <MonetizationOnIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Budget
                    </Typography>
                  }
                  secondary="Control your budget. Track your income and expenses in different categories."
                />
              </ListItem>
              <Box position="absolute" bottom={5}>
                <Typography component="a" onClick={() => handleComponentSelect('budgets')} color="primary">
                  Go to Budget
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardContent sx={useStyles.cardContent}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <SavingsIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Savings Goals
                    </Typography>
                  }
                  secondary="Set your savings goals. Plan for future expenses and track your progress."
                />
              </ListItem>
              <Box position="absolute" bottom={5}>
                <Typography component="a" onClick={() => handleComponentSelect('savings')} color="primary">
                  Go to Savings Goals
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardContent sx={useStyles.cardContent}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <RequestQuoteIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Expenses
                    </Typography>
                  }
                  secondary="Manage your expenses. View, add, and edit expenses for your budget."
                />
              </ListItem>
              <Box position="absolute" bottom={5}>
                <Typography component="a" onClick={() => handleComponentSelect('expenses')} color="primary">
                  Go to Expenses
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardContent sx={useStyles.cardContent}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <PaymentIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Bills
                    </Typography>
                  }
                  secondary="Manage your bills. View, add, and edit recuring payments."
                />
              </ListItem>
              <Box position="absolute" bottom={5}>
                <Typography component="a" onClick={() => handleComponentSelect('bills')} color="primary">
                  Go to Bills
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={useStyles.card}>
            <CardContent sx={useStyles.cardContent}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <TrendingUpIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      Income
                    </Typography>
                  }
                  secondary="Manage your income. View, add, and edit your income streams."
                />
              </ListItem>
              <Box position="absolute" bottom={5}>
                <Typography component="a" onClick={() => handleComponentSelect('incomes')} color="primary">
                  Go to Incomes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={5}>
      {renderSelectedComponent()}
      </Box>
    </Container>
  );
}

export default Dashboard;
