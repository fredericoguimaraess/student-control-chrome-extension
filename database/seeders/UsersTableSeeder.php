<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['name' => 'Ana', 'email' => 'ana.silva@example.com'],
            ['name' => 'Bruno', 'email' => 'bruno.oliveira@example.com'],
            ['name' => 'Carlos', 'email' => 'carlos.souza@example.com'],
            ['name' => 'Daniela', 'email' => 'daniela.pereira@example.com'],
            ['name' => 'Eduardo', 'email' => 'eduardo.lima@example.com'],
            ['name' => 'Fernanda', 'email' => 'fernanda.alves@example.com'],
            ['name' => 'Gabriel', 'email' => 'gabriel.santos@example.com'],
            ['name' => 'Helena', 'email' => 'helena.martins@example.com'],
            ['name' => 'Igor', 'email' => 'igor.costa@example.com'],
            ['name' => 'Julia', 'email' => 'julia.ferreira@example.com'],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
