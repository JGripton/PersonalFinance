import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, TextField, Button, Checkbox, Box, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { useAuth } from './AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editing, setEditing] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState({});


  const { refreshToken } = useAuth();

  useEffect(() => {
    fetchCategories();
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
      //Init checkbox states
      const newCheckboxes = {};
      console.log('Categories response data:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response.status === 401) {
        await refreshToken();
        fetchCategories();
      }
    }
  };

  const addCategory = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        'http://localhost:8000/api/category/',
        JSON.stringify(newCategory),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCategories([...categories, response.data]);
      setNewCategory({id: '', name: '', description: '' });
      //
    } catch (error) {
      console.error('Error adding category:', error);
      if (error.response) {
        console.error('Server responded with:', error.response.data, 'Status:', error.response.status);
        if (error.response.status === 401) {
          refreshToken();
        }
      }
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8000/category/${categoryId}/delete/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      if (error.response.status === 401) {
        await refreshToken();
        deleteCategory(categoryId);
      }
    }
  };  

  const handleSaveButtonClick = async () => {
    // Remove selected categories
    for (const categoryId in checkedStatus) {
      if (checkedStatus[categoryId]) {
        await deleteCategory(categoryId);
      }
    }
  
    // Update the local state
    setCategories(categories.filter((category) => !checkedStatus[category.id]));
    setCheckedStatus({});
    setEditing(false);
  };
  
  const handleCancelButtonClick = () => {
    setEditing(false);
  };
  
  const handleCheckboxChange = (event, categoryId) => {
    console.log('Category ID:', categoryId, 'Checked:', event.target.checked);
    setCheckedStatus((prevState) => ({
      ...prevState,
      [categoryId]: event.target.checked,
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
                  <IconButton edge="end" color="secondary"  >
                    <DeleteIcon />
                  </IconButton>
                  </TableCell>
                )}
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={"row" + category.id}>
                {editing && (
                  <TableCell>
                    <Checkbox
                      checked={checkedStatus[category.id] || false}
                      onChange={(event) => handleCheckboxChange(event, category.id)}
                    />
                  </TableCell>
                )}
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
      <TextField
        label="Category Name"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        fullWidth
      />
      <TextField
        label="Category Description"
        value={newCategory.description}
        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        fullWidth
      />
      
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={addCategory} sx={{ marginRight: "auto" }}>
          Add Category
        </Button>
        {!editing ? (
          <Button variant="contained" color="primary" onClick={handleEditButtonClick} sx={{ marginLeft: "16px" }}>
            Edit Categories
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
  
  export default Categories;
  
