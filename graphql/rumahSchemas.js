var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var RumahModel = require('../models').Rumah;


var rumahType = new GraphQLObjectType({
    name: "rumah",
    fields: function() {
      return {
        id: {
          type: GraphQLInt
        },
        alamat: {
          type: GraphQLString
        },
        jamban: {
          type: GraphQLString
        },
        kordinat: {
          type: GraphQLString
        },
        no_rumah: {
          type: GraphQLString
        },
        rt: {
          type: GraphQLString
        },
        rw: {
          type: GraphQLString
        },
        sampa: {
          type: GraphQLString
        },
        spal: {
          type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        kepemilikan: {
            type: GraphQLString
        },
        created_at: {
            type: GraphQLDate
        },
        no_telp: {
            type: GraphQLString
        },
        nilai: {
            type: GraphQLString
        },
        total_nilai: {
            type: GraphQLInt
        },
        petugas: {
            type: GraphQLInt
        },
        kecamatan: {
            type: GraphQLString
        },
        koordinat_kecamatan: {
            type: GraphQLString
        },
        kelurahan: {
            type: GraphQLString
        },
        koordinat_kelurahan: {
            type: GraphQLString
        }
      };
    }
  });

  

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        rumahs: {
          type: new GraphQLList(rumahType),
          resolve: function () {
            const rumahs = RumahModel.findAll({
              order: [
                ['id', 'DESC']
              ],
            })
            if (!rumahs) {
              throw new Error('Error')
            }
            return rumahs
          }
        },
        kel: {
            type: new GraphQLList(rumahType),
            args: {kelurahan: {name: 'kelurahan',type: GraphQLString}},
            resolve: function (root, params) {
              const kel = RumahModel.findAll({
                where: {kelurahan: params.kelurahan},
                order: [
                  ['id', 'DESC']
                ],
              })
              if (!kel) {
                throw new Error('Error')
              }
              return kel
            }
        },
        rumah: {
            type: rumahType,
            args: {
              id: {
                name: 'id',
                type: GraphQLInt
              }
            },
            resolve: function (root, params) {
              const rumahDetails = RumahModel.findByPk(params.id)
              if (!rumahDetails) {
                throw new Error('Error')
              }
              return rumahDetails
            }
          }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType});