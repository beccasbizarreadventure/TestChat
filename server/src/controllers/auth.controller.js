export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
  }
  catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};