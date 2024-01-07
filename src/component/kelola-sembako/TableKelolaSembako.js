import React, { Component } from "react";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { noConflict } from "jquery";
import "toastr/build/toastr.css";
import toastr from "toastr";

const names = [
  {
    id_sembako: 100102,
    foto_sembako: "Beras ABC.jpg",
    name_sembako: "Beras lalapan",
    poin_sembako: 230,
    stok_sembako: 5,
    status: "Aktif",
  },
  {
    id_sembako: 100103,
    foto_sembako: "Kangkung Jokowi.jpg",
    name_sembako: "Beras Sidoarjo",
    poin_sembako: 230,
    stok_sembako: 5,
    status: "Diarsipkan",
  },
  {
    id_sembako: 100101,
    foto_sembako: "Sepatu Prabowo.jpg",
    name_sembako: "Beras Padang",
    poin_sembako: 230,
    stok_sembako: 5,
    status: "Aktif",
  },
];

class TableKelolaSampah extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      id_sembako: "",
      foto_sembako: "",
      name_sembako: "",
      poin_sembako: 0,
      stok_sembako: 0,
      status: "",
      action: "",
      editingItemIndex: -1,
      editingItem: {},
      isModalOpen: false,
      dataAdded: false,
      statusOptions: ["Aktif", "Diarsipkan"],
    };
  }

  //TAMBAH SEMBAKO
  handleTambahSembako = () => {
    const {
      data_nasabah,
      id_sembako,
      foto_sembako,
      name_sembako,
      poin_sembako,
      stok_sembako,
      status,
    } = this.state;

    // Validasi input
    if (
      !id_sembako ||
      !name_sembako ||
      !poin_sembako ||
      !stok_sembako ||
      !status
    ) {
      alert("Semua field harus diisi");
      return;
    }

    // Buat objek sembako baru
    const newSembako = {
      id_sembako,
      name_sembako,
      poin_sembako,
      stok_sembako,
      status,
      foto_sembako: this.state.editingItem.foto_sembako,
    };

    // Tambahkan sembako baru ke array data_nasabah
    const newData = [...data_nasabah, newSembako];

    // Perbarui state dengan data yang baru dan cetak hasil
    this.setState(
      {
        data_nasabah: newData,
        id_sembako: "",
        name_sembako: "",
        poin_sembako: 0,
        stok_sembako: 0,
        status: "",
        dataAdded: true,
        editingItem: {},
        selectedImage: null,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_nasabah);
      }
    );
    this.clearFields();
    this.closeModal();
  };

  clearFields = () => {
    this.setState({
      id_sembako: "",
      foto_sembako: "",
      name_sembako: "",
      poin_sembako: 0,
      stok_sembako: 0,
      status: "",
      editingItem: {},
      selectedImage: null,
    });
  };

  //edit
  editItem = (index) => {
    const editingItem = { ...this.state.data_nasabah[index] };
    this.setState({
      editingItemIndex: index,
      editingItem,
      isModalOpen: true,
    });
  };

  // Hapus
  handleDelete = (index) => {
    const isConfirmed = window.confirm(
      "Apakah anda yakin ingin merubah status barang ini?"
    );
    if (isConfirmed) {
      const { data_nasabah } = this.state;
      // Buat salinan array data_nasabah
      const newData = [...data_nasabah];
      // Hapus baris dengan index tertentu
      newData.splice(index, 1);
      // Renew state dengan data yang baru
      this.setState({
        data_nasabah: newData,
      });
      toastr.success("Item berhasil dihapus!", "Hapus");
    } else {
      toastr.error("Item gagal dihapus", "Gagal!");
    }
  };

  //Status
  toggleStatus = (index) => {
    const isConfirmed = window.confirm(
      "Apakah anda yakin ingin merubah status item ini?"
    );
    if (isConfirmed) {
      const newData = [...this.state.data_nasabah]; // membuat salinan array data
      const currentItem = newData[index]; // mengambil item dengan indeks tertentu

      // Mengubah nilai status berdasarkan kondisi
      currentItem.status =
        currentItem.status === "Aktif" ? "Diarsipkan" : "Aktif";

      // Memperbarui state dengan data yang telah diubah
      this.setState({ data: newData });
      toastr.success("Status item berhasil dirubah", "Status");
    } else {
      toastr.error("Status item gagal dirubah", "Gagal!");
    }
  };

  //close modal
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  //Image View
  handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => ({
          editingItem: {
            ...prevState.editingItem,
            foto_sembako: reader.result.split(",")[1], // Mengambil bagian setelah koma
          },
          selectedImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
      this.setState((prevState) => ({
        editingItem: {
          ...prevState.editingItem,
          foto_sembako: reader.result,
        },
      }));
    }
  };

  handleImageUploadADD = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState((prevState) => ({
          selectedImage: reader.result,
          editingItem: {
            ...prevState.editingItem,
            foto_sembako: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  //save
  saveChanges = () => {
    const { editingItemIndex, editingItem, data_nasabah } = this.state;

    // Buat salinan array data_nasabah
    const newData = [...data_nasabah];

    // Perbarui item yang diedit dengan data yang baru
    newData[editingItemIndex] = { ...editingItem };

    // Perbarui state dengan data yang baru dan tutup modal
    this.setState(
      {
        data_nasabah: newData,
        editingItemIndex: -1,
        editingItem: {},
        isModalOpen: false,
        selectedImage: null,
      },
      () => {
        console.log("Data setelah disimpan:", this.state.data_nasabah);
      }
    );
  };

  // component didmount
  componentDidMount() {
    this.setState({ data_nasabah: names });
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table").DataTable({
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },

            buttons: [
              {
                extend: "pageLength",
                className: "btn btn-dark bg-dark",
              },
              // {
              //   extend: "copy",
              //   className: "btn btn-secondary bg-secondary",
              // },
              {
                extend: "csv",
                className: "btn btn-dark bg-dark",
              },

              // {
              //   extend: "print",
              //   customize: function (win) {
              //     $(win.document.body).css("font-size", "10pt");
              //     $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
              //   },
              //   className: "btn btn-secondary bg-secondary",
              // },
            ],

            fnRowCallback: function (
              nRow,
              aData,
              iDisplayIndex,
              iDisplayIndexFull
            ) {
              var index = iDisplayIndexFull + 1;
              $("td:first", nRow).html(index);
              return nRow;
            },

            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
            columnDefs: [
              {
                targets: 0,
                render: function (data, type, row, meta) {
                  return type === "export" ? meta.row + 1 : data;
                },
              },
            ],
          });
        }, 1000);
      });
    }
  }

  showTable = () => {
    try {
      return this.state.data_nasabah.map((item, index) => {
        return (
          <tr key={index}>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.id_sembako}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">
              <img
                src={`data:image/png;base64, ${item.foto_sembako}`}
                alt={`Foto ${item.foto_sembako}`}
                style={{ width: "50px" }}
              />
            </td>
            <td className="mt-1 mx-2">{item.name_sembako}</td>
            <td className="mt-1 mx-2">{item.poin_sembako}</td>
            <td className="mt-1 mx-2">{item.stok_sembako}</td>
            <td>
              <button
                className={`mt-1 mx-2 text-center ${
                  item.status === "Aktif"
                    ? "btn btn-success btn-sm pl-5 pr-5 text-center"
                    : item.status === "Diarsipkan"
                    ? "btn btn-secondary btn-sm pl-4 pr-4 text-center"
                    : ""
                }`}
                style={{ pointerEvents: "none" }}
              >
                {item.status}
              </button>
            </td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button
                className="btn btn-primary btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_return_whitelist"
                onClick={() => this.editItem(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-warning btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_hapus_akun"
                onClick={() => this.toggleStatus(index)}
              >
                {item.status === "Aktif" ? "Arsipkan" : "Aktifkan"}
              </button>
              <button
                className="btn btn-danger btn-sm mt-1 mx-2"
                data-toggle="modal"
                data-target="#modal_hapus_akun"
                onClick={() => this.handleDelete(index)}
              >
                Hapus
              </button>
            </td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    const { selectedImage } = this.state;
    return (
      <>
        <div className="mr-4 float-sm-right">
          <button
            className="btn-primary btn"
            data-toggle="modal"
            data-target="#modal_tambah_sembako"
          >
            + Tambah Sembako
          </button>
        </div>
        <div class="container-fluid">
          <div class="table-responsive p-0 pb-2">
            <table
              id="table"
              className="table align-items-center justify-content-center mb-0 table-striped"
            >
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    #
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    ID Sembako
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Foto
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Nama Sembako
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Poin per 0,5 kg
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Stok
                  </th>
                  <th className="text-uppercase  text-sm text-center pl-4">
                    Status
                  </th>
                  <th className="text-uppercase  text-sm text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="text-center">{this.showTable()}</tbody>
            </table>
            {/* MODALS EDIT */}
            <div
              className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
              id="modal_return_whitelist"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
              onShow={this.openTambahItemModal}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Tambah Sembako
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group"></div>
                        </div>
                        <div className="col-md-8 pb-4">
                          <div className="">
                            <div className="">
                              {selectedImage && (
                                <img
                                  src={selectedImage}
                                  alt="Preview"
                                  style={{ width: "50%" }}
                                />
                              )}
                            </div>
                            <input
                              type="file"
                              accept=".png"
                              onChange={this.handleImageUpload}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">ID Sembako:</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <div
                              type="text"
                              className="form-control text-left text-sm font-weight-bold"
                            >
                              {this.state.editingItem.id_sembako}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">Nama Sembako:</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control text-sm font-weight-bold"
                              value={this.state.editingItem.name_sembako}
                              onChange={(e) =>
                                this.setState({
                                  editingItem: {
                                    ...this.state.editingItem,
                                    name_sembako: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group ">
                            <label className="text-sm">
                              Harga per poin 0.5 kg (poin):
                            </label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control text-sm font-weight-bold "
                              value={this.state.editingItem.poin_sembako}
                              onChange={(e) =>
                                this.setState({
                                  editingItem: {
                                    ...this.state.editingItem,
                                    poin_sembako: parseInt(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">Stok (kg):</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control text-sm font-weight-bold"
                              value={this.state.editingItem.stok_sembako}
                              onChange={(e) =>
                                this.setState({
                                  editingItem: {
                                    ...this.state.editingItem,
                                    stok_sembako: parseInt(e.target.value),
                                  },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.closeModal}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.saveChanges}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* END OF MODALSEDIT */}
            {/* MODALS TAMBAH*/}
            <div
              className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
              id="modal_tambah_sembako"
              data-backdrop="static"
              data-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
              onShow={this.openTambahItemModal}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Tambah Sembako
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group"></div>
                        </div>
                        <div className="col-md-8 pb-4">
                          <div className="">
                            <div className="">
                              {selectedImage && (
                                <img
                                  src={selectedImage}
                                  alt="Preview"
                                  style={{ width: "50%" }}
                                />
                              )}
                            </div>
                            <input
                              type="file"
                              accept=".png"
                              onChange={this.handleImageUpload}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">ID Sembako:</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control text-sm font-weight-bold"
                              value={this.state.id_sembako}
                              onChange={(e) =>
                                this.setState({ id_sembako: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">Nama Sembako:</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control text-sm font-weight-bold"
                              value={this.state.name_sembako}
                              onChange={(e) =>
                                this.setState({ name_sembako: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">Status:</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control text-sm font-weight-bold"
                              value={this.state.status}
                              onChange={(e) =>
                                this.setState({ status: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group ">
                            <label className="text-sm">
                              Harga per poin 0.5 kg (poin):
                            </label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control text-sm font-weight-bold "
                              value={this.state.poin_sembako}
                              onChange={(e) =>
                                this.setState({ poin_sembako: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row px-5 text-md">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="text-sm">Stok (kg):</label>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control text-sm font-weight-bold"
                              value={this.state.stok_sembako}
                              onChange={(e) =>
                                this.setState({ stok_sembako: e.target.value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={this.closeModal}
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.clearFields}
                    >
                      Refresh
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.handleTambahSembako}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* END OF MODALS TAMBAH*/}
          </div>
        </div>

        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableKelolaSampah;