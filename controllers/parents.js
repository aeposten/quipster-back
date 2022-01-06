import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ParentModel from '../models/parentModel.js';

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const oldParent = await ParentModel.findOne({ email });

		if (!oldParent)
			return res.status(404).json({ message: 'Parent does not exist' });

		const correctPassword = await bcrypt.compare(password, oldParent.password);

		if (!correctPassword)
			return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign(
			{ email: oldParent.email, id: oldParent._id },
			'secret',
			{ expiresIn: '1h' }
		);

		res.status(200).json({ result: oldParent, token });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

export const register = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const oldParent = await ParentModel.findOne({ email });

		if (oldParent)
			return res.status(400).json({ message: 'Parent already exists' });

		const passwordHash = await bcrypt.hash(password, 12);

		const result = await ParentModel.create({
			email,
			password: passwordHash,
			name: `${name}`
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			'secret password',
			{ expiresIn: '1h' }
		);
		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
