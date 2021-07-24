using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._context = context;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("User Exists");

            using HMACSHA512 hash = new();

            var appUser = new AppUser()
            {
                UserName = registerDto.Username,
                PasswordHash = hash.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hash.Key
            };

            var user = new UserDto()
            {
                UserName = registerDto.Username,
                Token = tokenService.CreateToken(appUser)
            };

            _context.Users.Add(appUser);
            await _context.SaveChangesAsync();
            return user;
        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var appUser = await _context.Users.SingleOrDefaultAsync(x=> x.UserName == loginDto.Username);

            if (appUser == null) return Unauthorized("Invalid User");

            using HMACSHA512 hash = new(appUser.PasswordSalt);

            var computedHash = hash.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (appUser.PasswordHash[i] != computedHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }

            var user = new UserDto()
            {
                UserName = loginDto.Username,
                Token = tokenService.CreateToken(appUser)
            };

            return user;
        }

    }
}
