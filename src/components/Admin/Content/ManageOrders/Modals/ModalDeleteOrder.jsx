import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { deleteOrder } from "../../../../../services/apiServices";

export default function ModalDeleteOrder(props) {
  const { dataDelete, fetchListOrders } = props;

  const handleClose = () => {
    document.getElementById("modal-delete-order").close();
  };

  const handleSubmitDeleteOrder = async () => {
    let res = await deleteOrder(dataDelete.order_id);

    if (res) {
      toast.success("Deleted!");
      handleClose();
      await fetchListOrders();
    }
  };
  return (
    <dialog id="modal-delete-order" className="modal">
      <div className="modal-box">
        <h1 className="pb-4 text-xl font-bold">Delete order</h1>
        <ul>
          <li>
            Order date: <b>{dataDelete.order_date}</b>
          </li>
          <li>
            Start time: <b>{dataDelete.start_time}</b>
          </li>
          <li>
            Start point: <b>{dataDelete.start_point}</b>
          </li>
          <li>
            End point: <b>{dataDelete.end_point}</b>
          </li>
          <li>
            Load name: <b>{dataDelete.load_name}</b>
          </li>
          <li>
            Load weight: <b>{dataDelete.load_weight}</b>
          </li>
        </ul>
        {/* luôn đặt modal-action phía dưới cùng */}
        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => handleSubmitDeleteOrder()}
          >
            Delete
          </button>
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
            <button className="btn btn-ghost">Cancel</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Click outside to close - this btn cannot be seen</button>
      </form>
    </dialog>
  );
}

ModalDeleteOrder.propTypes = {
  dataDelete: PropTypes.object.isRequired,
  fetchListOrders: PropTypes.func.isRequired,
};
