import React, { Component } from "react";
// inisiasi component
import Layout from "../../component/Layout/Layout";
import TableBacklist from "../../component/data-backlist/TableBacklist";

import { HiUsers } from "react-icons/hi";

export default class DataBacklistPage extends Component {
  constructor() {
    super();
    this.state = {
      adminName: "Ferdi",
      nasabahCount: 852,
      totalSampahCount: 852,
      nasabahPerluVerifikasiCount: 852,
      transaksiSembakoCount: 29,
    };
  }

  // dummyData = [
  //   {
  //     adminName: "Pak Ferdi",
  //     nasabahCount: "18 Feb 2023",
  //     totalSampahCount: "Diagnosis and Procedure Coded",
  //     nasabahPerluVerifikasiCount: "OPA2121200001",
  //     transaksiSembakoCount: "18 Feb 2023",
  //   },
  // ];

  render() {
    return (
      <div>
        <Layout>
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0">Data Backlist Nasabah</h1>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item ">
                        <a href="/home">Home</a>
                      </li>
                      <li className="breadcrumb-item ">
                        <a href="/vernas">Verifikasi Nasabah</a>
                      </li>
                      <li className="breadcrumb-item active">
                        <a href="/data-backlist">Data Backlist</a>
                      </li>
                    </ol>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            <section className="content">
              <TableBacklist />
            </section>
          </div>
        </Layout>
      </div>
    );
  }
}
