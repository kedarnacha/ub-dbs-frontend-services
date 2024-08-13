import React, { Component } from "react";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
// import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

const names = [
  {
    id_transaksi: 10010,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
    name_pengepul: "Agus",
    berat_sampah_jual: 230,
    jumlah_pendapatan: 700,
  },
  {
    id_transaksi: 10010,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
    name_pengepul: "Nonin",
    berat_sampah_jual: 230,
    jumlah_pendapatan: 700,
  },
  {
    id_transaksi: 10010,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
    name_pengepul: "Ega",
    berat_sampah_jual: 230,
    jumlah_pendapatan: 700,
  },
];

class TableDataPenjualanSampah extends Component {
  constructor() {
    super();
    this.state = {
      data_nasabah: [],
      id_transaksi: "",
      waktu_transaksi: "",
      name_pengepul: "",
      berat_sampah_jual: 0,
      jumlah_pendapatan: 0,
      action: "",
    };
  }
  // component didmount
  componentDidMount() {
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

            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
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
      return names.map((item, index) => {
        return (
          <tr>
            <td className="mt-1 mx-2">{index + 1}</td>
            <td className="mt-1 mx-2">{item.id_transaksi}</td>
            {/* <td className="text-xs font-weight-bold">{item.firstname + " " + item.lastname}</td> */}
            <td className="mt-1 mx-2">{item.waktu_transaksi}</td>
            <td className="mt-1 mx-2">{item.name_pengepul}</td>
            <td className="mt-1 mx-2">{item.berat_sampah_jual}</td>
            <td className="mt-1 mx-2">{item.jumlah_pendapatan}</td>
            <td className="d-flex justify-content-center">
              {/* <button className="btn btn-info btn-sm mt-1 mx-2" onClick={() => this.ubahData(paket.id_paket)}> */}
              <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_return_whitelist">
                Detail
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
    return (
      <>
        <div class="container-fluid">
          <div class="table-responsive p-0 pb-2">
            <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
              <thead>
                <tr>
                  <th className="text-uppercase  text-sm ">#</th>
                  <th className="text-uppercase  text-sm ">ID Transaksi</th>
                  <th className="text-uppercase  text-sm ">Waktu Transaksi</th>
                  <th className="text-uppercase  text-sm ">Nama Pengepul</th>
                  <th className="text-uppercase  text-sm ">Jumlah Sampah</th>
                  <th className="text-uppercase  text-sm ">Pendapatan</th>
                  <th className="text-uppercase  text-sm ">Action</th>
                </tr>
              </thead>

              <tbody>{this.showTable()}</tbody>
            </table>
          </div>
        </div>

        {/* MODAL APALAGI */}
      </>
    );
  }
}

export default TableDataPenjualanSampah;
