import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  getCategory,
  updateCategory
} from "../../../functons/category";
const CategoryUpdate = ({history,match}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    loadCategory()
  }, []);

  const loadCategory = () =>
    getCategory(match.params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug,{ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
       history.push('/admin/category')
      })
      .catch((err) => {
        setLoading(false);
        setName("");
        if (err.resonse.status === 400) toast.error(err.response.data);
      });
  };

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="from-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <br />
          <button className="btn btn-outline-primary">Save</button>
        </div>
      </form>
    );
  };

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
            <h4>Update category</h4>
          )}
          {categoryForm()}
          <hr />
          {/* {categories.map((c) => (
            <div className="alert alert-secondary" key={c.id}>
              {c.name}{" "}
              <span
                onClick={() => handleRemove(c.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;