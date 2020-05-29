'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rumahs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      alamat: {
        type: Sequelize.STRING
      },
      jamban: {
        type: Sequelize.STRING
      },
      kordinat: {
        type: Sequelize.STRING
      },
      no_rumah: {
        type: Sequelize.STRING
      },
      rt: {
        type: Sequelize.STRING
      },
      rw: {
        type: Sequelize.STRING
      },
      sampa: {
        type: Sequelize.STRING
      },
      spal: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      kepemilikan: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      no_telp: {
        type: Sequelize.STRING
      },
      nilai: {
        type: Sequelize.STRING
      },
      total_nilai: {
        type: Sequelize.INTEGER
      },
      petugas: {
        type: Sequelize.INTEGER
      },
      kecamatan: {
        type: Sequelize.STRING
      },
      koordinat_kecamatan: {
        type: Sequelize.STRING
      },
      kelurahan: {
        type: Sequelize.STRING
      },
      koordinat_kelurahan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rumahs');
  }
};