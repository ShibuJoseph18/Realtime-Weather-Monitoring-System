import User from '../models/userData.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error });
  }
};

// Create a new user
export const createUser = async (req, res) => {
    const { name, email, phone_number, temperature_unit } = req.body;
  
    try {
      // Create a new user
      const newUser = await User.create({
        name,
        email,
        phone_number,
        temperature_unit
      });
  
      // Send response with the newly created user
      res.status(201).json(newUser);
  
    } catch (error) {
      // Handle unique constraint errors (SequelizeUniqueConstraintError)
      if (error.name === 'SequelizeUniqueConstraintError') {
        let field = '';
        if (error.errors[0].path === 'email') {
          field = 'Email';
        } else if (error.errors[0].path === 'phone_number') {
          field = 'Phone number';
        }
  
        return res.status(400).json({ message: `${field} is already in use.` });
      }
  
      // Handle other errors
      res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
  };

// Update user preferences
export const updateUser = async (req, res) => {
    const { email } = req.params; // Extract email from the URL parameters
    const { temperature_unit } = req.body; // Get the new temperature unit from the request body
  
    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      if (user) {
        // Update the temperature_unit
        user.temperature_unit = temperature_unit;
        await user.save();
  
        // Respond with the updated user data
        res.status(200).json(user);
      } else {
        // If no user found, return a 404 error
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // If an error occurs, respond with a 500 status and error message
      res.status(500).json({ message: 'Failed to update user', error });
    }
  };
  

// Delete a user
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.status(204).send();
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete user', error });
//   }
// };
