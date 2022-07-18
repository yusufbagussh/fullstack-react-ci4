<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Users extends ResourceController
{
    use ResponseTrait;

    public function __construct()
    {
        $this->model = new UserModel();
        helper(['form']);
    }
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */

    public function index()
    {
        $data = $this->model->findAll();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $data = $this->model->find(['id' => $id]);
        if (!$data) return $this->failNotFound("Data with id $id is not Found");
        return $this->respond($data[0]);
    }

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        $rules = [
            'username' => 'required',
            'password' => 'required',
            'nama' => 'required',
        ];
        $data = [
            'username' => $this->request->getVar('username'),
            'password' => $this->request->getVar('password'),
            'nama' => $this->request->getVar('nama')
        ];

        $fileGambar = $this->request->getFile('gambar');

        if ($fileGambar) {
            $namaGambar = $fileGambar->getRandomName();
            //pindah gambar ke folder yang dituju
            $fileGambar->move('img/', $namaGambar);
        } else {
            $namaGambar = '';
        }

        $data['gambar'] = $namaGambar;

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $this->model->save($data);
        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Inserted'
            ]
        ];
        return $this->respondCreated($response);
    }

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
        $rules = [
            'username' => 'required',
            'password' => 'required',
            'nama' => 'required'
        ];
        $data = [
            'username' => $this->request->getVar('username'),
            'password' => $this->request->getVar('password'),
            'nama' => $this->request->getVar('nama')
        ];
        if (!$this->validate($rules)) return $this->fail($this->validator->getErrors());
        $findById = $this->model->find(['id' => $id]);

        // $fileGambar = $this->request->getFile('gambar');
        // if (!$fileGambar) {
        //     $namaGambar = $findById['gambar'];
        // } else {
        //     $namaGambar = $fileGambar->getRandomName();
        //     $fileGambar->move('img/', $namaGambar);
        // }
        // $data['gambar'] = $namaGambar;

        if (!$findById) return $this->failNotFound("Data with id $id is Not Found");
        $this->model->update($id, $data);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Updated'
            ]
        ];
        return $this->respond($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $findById = $this->model->find(['id' => $id]);
        if (!$findById) return $this->failNotFound('No Data Found');
        $this->model->delete($id);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Deleted'
            ]
        ];
        return $this->respond($response);
    }
}
