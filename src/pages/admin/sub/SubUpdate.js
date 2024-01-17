import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import CategoryForm from "../../../components/forms/CategoryForm";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functons/category";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import LocalSearch from "../../../components/forms/LocalSearch";
import { getSub, updateSub } from "../../../functons/sub";
const SubUpdate = ({match,history}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");


  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () => getSub(match.params.slug).then((s) => {
    setName(s.data.name)
    setParent(s.data.parent)
  }
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug,{ name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push('/admin/sub')
      })
      .catch((err) => {
        setLoading(false);
        setName("");
        if (err.resonse.status === 400) toast.error(err.response.data);
      });
  };
  

  //step 3

  //step 4
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update sub category</h4>
          )}
          <div className="form-froup">
            <label>Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select one</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id===parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        

          {/* step 5 */}
   
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
