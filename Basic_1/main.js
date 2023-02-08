const mongoose = require("mongoose");

const main = async () => {
	try {
		const connection = await mongoose.connect(
			"mongodb://127.0.0.1:27017/backend",
		);
		console.log("connected");
		const student = new StudentModel({
			name: "Sandeep",
			age: 25,
			city: "Ludhiana",
		});
		await student.save();

		// await StudentModel.deleteMany({ name: "Sandeep" });
		const students = await StudentModel.find();
		console.log(students);

		// connection.disconnect();
		// console.log("disconnected")
	} catch (error) {
		console.log("err");
	}
};

main();

const studentSchema = mongoose.Schema({
	name: String,
	age: Number,
	city: String,
}/* ,{
    versionKey:false
} */);

const StudentModel = mongoose.model("student", studentSchema);
