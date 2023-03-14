import Todo from "../model/Todo.js";
import checkPermissions from "../utils/checkPermisions.js";

const CreateTodo = async (req, res) => {
  const { todo } = req.body;
  if (!todo) {
    throw new Error("Please provide all value");
  }
  req.body.createdBy = req.user.userId;
  const todoItem = await Todo.create(req.body);

  res.status(200).send({ todoItem });
};
const GetUsersTodo = async (req, res) => {
  const userId = req.user.userId;

  const todos = await Todo.find({ createdBy: userId });
  res.status(200).json({ todos });
};

const DeleteTodo = async (req, res) => {
  const { id: todoId } = req.params;

  const todo = await Todo.findOne({ _id: todoId });

  if (!todo) {
    throw new Error(`No Todo with this id:${todoId}`);
  }
  checkPermissions(req.user, todo.createdBy);
  await todo.remove();
  res.status(200).send("Todo has been deleted successfully");
};
const UpdateTodo = async (req, res) => {
  const { _id,todo } = req.body;
  if (!todo) {
    throw new Error("Please provide all value");
  }
  console.log(_id);
  const todoItem = await Todo.findByIdAndUpdate(_id,{todo});

  res.status(200).send({ todoItem });
};

export { CreateTodo, GetUsersTodo, DeleteTodo,UpdateTodo };
